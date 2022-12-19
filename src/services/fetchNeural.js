// const apiUrl = "https://nonexistentusername-stabilityai-stable-diffusion-2-1.hf.space/run/predict"
const apiUrl = 'https://nonexistentusername-compvis-stable-diffusion-v1-4.hf.space/run/predict'

const query = async (prompt) => {
    console.log('sending prompt...')
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json"
                // Authorization: `Bearer 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`
            },
            method: "POST",
            body: JSON.stringify({
                data: [prompt]
            })
        })
        console.log(response)
        const result = await response.json()
        return result
    } catch (err) {
        return err
    }
}

export {query}