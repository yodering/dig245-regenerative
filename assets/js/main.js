
/* javascript */
const apiKey = "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";
const maxImages = 4;
const imageUrls = [];



const response = fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            inputs: "cat"
          })
    }
)

if (!response.ok) {
    alert("Failed to generate image!");
}


