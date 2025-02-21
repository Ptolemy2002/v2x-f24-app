import { Storage } from '@google-cloud/storage';
import getEnv from 'env';

const env = getEnv();

const storage = new Storage({});
export const conversationBucket = storage.bucket(env.gcloud.conversationBucket);
console.log(`Using Google Cloud bucket ${env.gcloud.conversationBucket} for conversations`);

export default storage;