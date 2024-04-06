import fetch from 'node-fetch';

type WebhookRegistration = {
  event: string;
  url: string;
};

class WebhookService {
  private registrations: WebhookRegistration[] = [];

  public register(event: string, url: string) {
    this.registrations.push({ event, url });
    console.log(`Webhook registrado: ${event} -> ${url}`);
  }

  public async trigger(event: string, data: any) {
    const relevantWebhooks = this.registrations.filter(reg => reg.event === event);
    relevantWebhooks.forEach(async ({ url }) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Error al disparar webhook: ${response.statusText}`);
        }
        console.log(`Webhook disparado con éxito para el evento ${event}: ${url}`);
      } catch (error) {
        console.error(`Error al enviar el webhook a ${url}:`, error);
      }
    });
  }
}

export const webhookService = new WebhookService();
