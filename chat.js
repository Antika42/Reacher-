import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method tidak diizinkan."
        });

    }


    try {

        const { message } = req.body;


        if (!message) {

            return res.status(400).json({
                error: "Pesan kosong."
            });

        }


        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            input: message

        });


        return res.status(200).json({

            answer: response.output_text

        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({

            error: "AI gagal memberikan jawaban."

        });

    }

}