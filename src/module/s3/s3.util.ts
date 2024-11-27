import { Client } from 'minio';
import { Logger } from '@nestjs/common';
import * as stream from 'node:stream';

export const S3Util = {
    name: 'S3Util',
    instances: new Map() as Map<string, Client>,
    getInstance: async (config: {
        bucket: string;
        endPoint: string;
        accessKey: string;
        secretKey: string
    }): Promise<Client> => {
        try {
            const configKey = `${config.bucket}:${config.endPoint}:${config.accessKey}:${config.secretKey}`;
            if (!S3Util.instances.has(configKey)) {
                const client = new Client({
                    endPoint: config.endPoint,
                    accessKey: config.accessKey,
                    secretKey: config.secretKey,
                    useSSL: false,
                });
                S3Util.instances.set(configKey, client);
            }
            return S3Util.instances.get(configKey)!;
        } catch (error) {
            Logger.error(`${S3Util}->${S3Util.getInstance.name}: ${error}`);
            return null;
        }
    },
    isExistsFilePath: async (client: Client, bucket: string, path: string): Promise<boolean> => {
        try {
            return client.statObject(bucket, path).then(data => true).catch(() => false);
        } catch (error) {
            Logger.error(`${S3Util.name}->${S3Util.isExistsFilePath.name}: ${error}`);
            return null;
        }
    },
    uploadByFilePath: async (
        config: { bucket: string; endPoint: string; accessKey: string; secretKey: string },
        relativePathFileDestination: string,
        relativePathFileSource: string,
    ) => {
        const client = await S3Util.getInstance(config);
        try {
            const isExistsBucket = await client.bucketExists(config.bucket);
            if (!isExistsBucket) {
                await client.makeBucket(config.bucket);
            }
            const isExistsFilePath = await S3Util.isExistsFilePath(client, config.bucket, relativePathFileDestination);
            if (!isExistsFilePath) {
                return await client.fPutObject(config.bucket, relativePathFileDestination, relativePathFileSource);
            }
        } catch (error) {
            Logger.error(`${S3Util.name}->${S3Util.uploadByFilePath.name}: ${error}`);
            return null;
        }
    },
    uploadByFileStream: async ( // Upload file từ stream hoặc buffer
        config: { bucket: string; endPoint: string; accessKey: string; secretKey: string },
        relativePathFileDestination: string,
        data: string | stream.Readable | Buffer,
    ) => {
        const client = await S3Util.getInstance(config);
        try {
            const isExistsBucket = await client.bucketExists(config.bucket);
            if (!isExistsBucket) {
                await client.makeBucket(config.bucket);
            }
            const isExistsFilePath = await S3Util.isExistsFilePath(client, config.bucket, relativePathFileDestination);
            if (!isExistsFilePath) {
                return await client.putObject(config.bucket, relativePathFileDestination, data);
            }
        } catch (error) {
            Logger.error(`${S3Util.name}->${S3Util.uploadByFileStream.name}: ${error}`);
            return null;
        }
    },
};

