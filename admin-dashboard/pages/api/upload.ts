// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm, File } from "formidable";
// import { v2 as cloudinary } from "cloudinary";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
//   api_key: process.env.CLOUDINARY_API_KEY || "",
//   api_secret: process.env.CLOUDINARY_API_SECRET || "",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const form = new IncomingForm();

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Form parse error:", err);
//       return res.status(500).json({ error: "Form parsing failed" });
//     }

//     // 'file' field from form-data
//     let uploadedFile: File | undefined;

//     if (Array.isArray(files.file)) {
//       uploadedFile = files.file[0];
//     } else if (files.file) {
//       uploadedFile = files.file as File;
//     }

//     if (!uploadedFile) {
//       console.error("No file uploaded");
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filepath = uploadedFile.filepath || (uploadedFile as any).path;

//     if (!filepath) {
//       console.error("File path missing");
//       return res.status(500).json({ error: "File path missing" });
//     }

//     try {
//       const result = await cloudinary.uploader.upload(filepath, {
//         folder: "about-images",
//       });

//       return res.status(200).json({ url: result.secure_url });
//     } catch (uploadErr) {
//       console.error("Cloudinary upload error:", uploadErr);
//       return res.status(500).json({ error: "Upload to Cloudinary failed" });
//     }
//   });
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    console.log("Parsed fields:", fields);

    let uploadedFile: File | undefined;

    if (Array.isArray(files.file)) {
      uploadedFile = files.file[0];
    } else if (files.file) {
      uploadedFile = files.file as File;
    }

    if (!uploadedFile) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filepath = uploadedFile.filepath || (uploadedFile as any).path;
    if (!filepath) {
      console.error("File path missing");
      return res.status(500).json({ error: "File path missing" });
    }

    const folder = Array.isArray(fields.folder)
      ? fields.folder[0]
      : fields.folder || "uploads";

    console.log("Uploading to Cloudinary from:", filepath);
    console.log("Uploading to folder:", folder);

    try {
      const result = await cloudinary.uploader.upload(filepath, {
        folder,
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ error: "Upload to Cloudinary failed" });
    }
  });
}
