from app.core.config import get_settings

try:
    from groq import GroqClient
except ImportError:  # pragma: no cover
    GroqClient = None


class GroqClientWrapper:
    def __init__(self, api_key: str) -> None:
        if GroqClient is None:
            raise RuntimeError("Groq SDK is not installed. Install it using requirements.txt")
        self.client = GroqClient(api_key=api_key)

    def generate(self, prompt: str) -> str:
        response = self.client.responses.create(
            model="llama-3.3-70b-versatile",
            input=prompt,
        )
        if hasattr(response, "output") and response.output:
            first_output = response.output[0]
            if hasattr(first_output, "content") and first_output.content:
                return str(first_output.content[0].text or "").strip()
        return str(response)
