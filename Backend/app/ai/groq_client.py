from app.core.config import get_settings

try:
    from groq import Groq as GroqClient
except ImportError:  # pragma: no cover
    try:
        from groq import Client as GroqClient
    except ImportError:  # pragma: no cover
        GroqClient = None


class GroqClientWrapper:
    def __init__(self, api_key: str) -> None:
        if GroqClient is None:
            raise RuntimeError("Groq SDK is not installed. Install it using requirements.txt")
        self.client = GroqClient(api_key=api_key)

    def generate(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
        )
        if getattr(response, "choices", None):
            first_choice = response.choices[0]
            if hasattr(first_choice, "message") and getattr(first_choice.message, "content", None):
                return str(first_choice.message.content).strip()
        return str(response)
