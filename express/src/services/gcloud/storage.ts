import { Storage } from '@google-cloud/storage';
import getEnv from 'env';
import ms from 'ms';

const env = getEnv();

const storage = new Storage({});
export const conversationBucket = storage.bucket(env.gcloud.conversationBucket);
console.log(`Using Google Cloud bucket ${env.gcloud.conversationBucket} for conversations`);

export async function cleanupAnonymousConversationFiles(maxAge: number = ms("1d")) {
    console.log(`Cleaning up anonymous files older than ${ms(maxAge)}`);
    const [files] = await conversationBucket.getFiles({ prefix: 'anonymous-' })
    
    const now = Date.now();
    for (const file of files) {
        if (!file.metadata.timeCreated) {
            console.log(`Skipping deletion of anonymous file ${file.name} with no creation time`);
            continue;
        }

        if (file.name.endsWith('/')) {
            console.log(`Skipping deletion of anonymous directory ${file.name}, as we don't know it has no files younger than ${ms(maxAge)}.`);
            continue;
        }

        console.log(`Found anonymous file ${file.name} created at ${file.metadata.timeCreated}. Querying age to determine if it should be deleted.`);
        const created = new Date(file.metadata.timeCreated).getTime();
        const age = now - created;
        if (age > maxAge) {
            console.log(`Deleting anonymous file ${file.name}, as it is older than ${ms(maxAge)}.`);
            await file.delete();
        } else {
            console.log(`Skipping deletion of anonymous file ${file.name}, as it is younger than ${ms(maxAge)} (${ms(age)}).`);
        }
    }

    console.log(`Finished cleaning up anonymous files older than ${ms(maxAge)}`);
}

export default storage;