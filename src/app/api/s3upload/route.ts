import { NextResponse } from "next/server"; 
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION, 
    credentials: fromEnv(), 
});

async function uploadFileToS3(file: any, fileName: any) {
    console.log("IN uploading file to s3"); 
    const fileBuffer = file; 
    console.log(fileName); 

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}-${Date.now()}`, 
        Body: fileBuffer, 
        ACL: "public-read" as ObjectCannedACL,
        ContentType: "image/jpeg", 
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;

}

export async function POST(req: Request) {

    try {
        const formData = await req.formData();
        const file = formData.get("file"); 
        // do your checks here
        if (!(file instanceof File)) {
            return NextResponse.json({ error: "File is required." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer()); 
        const fileName = await uploadFileToS3(buffer, file.name); 
        
        return NextResponse.json({ success: true, fileName});

    } catch (error) {
        return NextResponse.json({ error: "Error uploading file"});
    }
}
