import {QuestionRegisterDTO} from "../dto/QuestionRegisterDTO";
import {QuestionRepository} from "../repository/QuestionRepository";
import {Question, QuestionField, QuestionImage, QuestionOption} from "../models/entity";
import {QuestionFieldRepository} from "../repository/QuestionFieldRepository";
import {QuestionFieldType} from "../models/enums";
import {QuestionOptionRepository} from "../repository/QuestionOptionRepository";
import {S3Service} from "../services/S3Sevice";
import {QuestionImageRepository} from "../repository/QuestionImageRepository";
import * as fs from "node:fs";
import {MediaRepository} from "../repository/MediaRepository";

export class QuestionDomain {

    readonly questionRepository: QuestionRepository;
    readonly fieldRepository: QuestionFieldRepository;
    readonly questionImageRepository: QuestionImageRepository;
    readonly questionOptionRepository: QuestionOptionRepository;
    readonly s3Service: S3Service;

    constructor() {
        this.questionRepository = new QuestionRepository();
        this.fieldRepository = new QuestionFieldRepository();
        this.questionOptionRepository = new QuestionOptionRepository();
        this.questionImageRepository = new QuestionImageRepository();
        this.s3Service = new S3Service();
    }

    async register(questionDTO: QuestionRegisterDTO) {
        const question = new Question();
        question.name = questionDTO.name;

        const support_data = new QuestionField();
        const title = await  new QuestionField().createAsTitle(questionDTO, question);
        if (questionDTO.videos.questionTitle) {
            const mediaRepository  = new MediaRepository();
            const media = await mediaRepository.findById(questionDTO.videos.questionTitle);
            media.field = title;
            title.media = media
            await mediaRepository.save(media);
        }
        await this.fieldRepository.save(title);

        if (questionDTO.support_data) {
            support_data.fieldType = QuestionFieldType.support_data;
            support_data.fieldValue = questionDTO.support_data;
            if (questionDTO.videos.questionSupport) {
                const mediaRepository  = new MediaRepository();
                const media = await mediaRepository.findById(questionDTO.videos.questionSupport);
                media.field = title;
                support_data.media = media
                await mediaRepository.save(media);
            }
            await this.fieldRepository.save(support_data);
        }

        const fields: QuestionField[] = [title];
        if (questionDTO.support_data) {
            fields.push(support_data);
        }
        question.fields = fields;
        const questionImages = [];

        if (questionDTO.file) {
            for (const file of questionDTO.file)    {
                const imageLink = await this.s3Service.sendImage(file);
                if (imageLink) {
                    const questionImage = new QuestionImage();
                    questionImage.question = question;
                    questionImage.url = imageLink;
                    questionImages.push(questionImage);
                    await this.questionImageRepository.save(questionImage);

                }
            }
            question.images = questionImages;
        }
        if (questionDTO.answers) {
            let answers: Array<QuestionOption> = [];
            for (const option of questionDTO.answers) {
                const newOption = new QuestionOption();
                newOption.question = question;
                newOption.title = option.title;
                newOption.videoLink = undefined;
                if (option.isAnswer) {
                    newOption.isAnswer = option.isAnswer;
                } else {
                    newOption.isAnswer = false;
                }
                answers.push(newOption);
                await this.questionOptionRepository.save(newOption);
            }
            question.options  = answers
        }

        await this.questionRepository.save(question);
    }
    async getAll(): Promise<Question[]> {
        return this.questionRepository.findAll();
    }
    async remove(questionId: string): Promise<void> {
        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            throw new Error(`Question not found`);
        }

        if (question.images && question.images.length) {
            for (const image of question.images) {
                const splitLink = image.url.split('/');
                const  imageKey = splitLink[splitLink.length - 1];
                await this.s3Service.removeObject(imageKey);
            }
        }
        return this.questionRepository.remove(question);
    }
    async findOne(questionId: string): Promise<Question> {
        const question =  await this.questionRepository.findById(questionId);

        if (question) {
            let images = [];

            if (question.images) {
                for (const image of question.images) {
                    const response = await fetch(image.url);
                    const decoderStream = new TextDecoderStream();
                    const base64: any =  await response.body?.
                    pipeThrough(decoderStream).
                    getReader().read();

                    images.push({
                        id: image.id,
                        url: base64.value,
                        question: image.question,
                    });
                }

                question.images = images;
            }
        }
        return question;
    }
    async update(questionId: string, questionDTO: QuestionRegisterDTO) {
        const question: Question = await this.questionRepository.findById(questionId);
        if (!question) {
            throw new Error('Question not found!');
        }
        question.name = questionDTO.name;

        const title = new QuestionField();
        const support_data = new QuestionField();

        title.fieldType = QuestionFieldType.title;
        title. fieldValue = questionDTO.title;
        title.question = question;
        if (questionDTO.support_data) {
            support_data.fieldType = QuestionFieldType.support_data;
            support_data.fieldValue = questionDTO.support_data;
            await this.fieldRepository.save(support_data);
        }
        await this.fieldRepository.save(title);

        const fields: QuestionField[] = [title];
        if (questionDTO.support_data) {
            fields.push(support_data);
        }
        question.fields = fields;
        let questionImages: Array<QuestionImage> = [];

        if (questionDTO.file) {
            if (question.images && question.images.length) {
                if (questionDTO.removedImages && questionDTO.removedImages.length) {
                    for (const removeImage of questionDTO.removedImages) {
                        await this.questionImageRepository.removeById(removeImage)
                    }
                }
            }
            if (questionDTO.file && questionDTO.file.length) {
                for (const file of questionDTO.file) {
                    const imageLink = await this.s3Service.sendImage(file);
                    if (imageLink) {
                        const questionImage = new QuestionImage();
                        questionImage.question = question;
                        questionImage.url = imageLink;
                        questionImages.push(questionImage);
                        await this.questionImageRepository.save(questionImage);

                    }
                }
            }
            const preloadedImages:QuestionImage[] = await this.questionImageRepository.findAll();
            questionImages = [...questionImages, ...preloadedImages];
            question.images = questionImages;
        }
        if (questionDTO.answers && questionDTO.answers.length) {
            let answers: Array<QuestionOption> = [];
            for (const option of questionDTO.answers) {
                const newOption = new QuestionOption();
                newOption.question = question;
                newOption.title = option.title;
                newOption.videoLink = undefined;
                if (option.isAnswer) {
                    newOption.isAnswer = option.isAnswer;
                } else {
                    newOption.isAnswer = false;
                }
                answers.push(newOption);
                await this.questionOptionRepository.save(newOption);
            }
            question.options  = answers
        }

        await this.questionRepository.save(question);
    }
    async findByTitle(title: string) {
        return await this.questionRepository.findByTitle(title);
    }
    async saveFieldVideo(contens: any) {

        const videoLink = await new S3Service().sendVideo(contens);
        return await new MediaRepository().save({
            link: videoLink
        })
    }
    async removeFieldVideo(mediaLink: any) {
        const repository = new MediaRepository();
        const media = await repository.findByLink(mediaLink);
        if (!media) {
            throw new Error('media not found');
        }
        await new S3Service().removeObject(mediaLink);
        await repository.remove(media);
    }
    async getFieldVideo(fieldId: any) {
        const field =  await this.fieldRepository.findById(fieldId);
        return field.media?.link
    }
}
