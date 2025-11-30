import {DeleteObjectCommand, PutObjectCommand, S3Client,} from "@aws-sdk/client-s3";
import 'dotenv/config';
import {randomUUID} from "node:crypto";


export class S3Service {

    private client: any;
    private bucket: string = 'sinalizaporva';
    constructor() {
        if (process.env.AWS_ID && process.env.AWS_PRIVATE_KEY) {
            this.client = new S3Client({
                region: "us-east-1",
                credentials: {
                    accessKeyId: process.env.AWS_ID,
                    secretAccessKey: process.env.AWS_PRIVATE_KEY
                }
            });

        }
    }

    async sendImage(base64Image: string) {
        const filename = randomUUID();
        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: filename,
                Body: base64Image,
                ACL: 'public-read',
            }));
        return `https://${this.bucket}.s3.us-east-1.amazonaws.com/${filename}`;
    }
    async removeObject(objectLink: string) {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: await this.extractObjectKey(objectLink),
            }));
    }

    async extractObjectKey(link: string): Promise<string> {
        const split = link.split('/');
        return split[split.length - 1];
    }

    async getImage(url:string): Promise<string> {
        const result = await fetch(url);
        const blob = await result.blob();
        return await blob.text();
    }
}