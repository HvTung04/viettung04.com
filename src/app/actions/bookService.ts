'use server';

export async function submitBookingForm(formData: FormData) {
  const service = formData.get('service') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const projectName = formData.get('projectName') as string;
  const budget = formData.get('budget') as string;
  const timeframe = formData.get('timeframe') as string;
  const description = formData.get('description') as string;

  // Simulate network delay for UX
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // If a Discord webhook is provided, dispatch a notification
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: `New Service Booking: ${service}`,
              color: 3965942, // Primary blue
              fields: [
                { name: 'Name', value: name || 'N/A', inline: true },
                { name: 'Email', value: email || 'N/A', inline: true },
                { name: 'Project Name', value: projectName || 'N/A', inline: true },
                { name: 'Budget', value: budget || 'N/A', inline: true },
                { name: 'Timeframe', value: timeframe || 'N/A', inline: true },
                { name: 'Details', value: description || 'N/A', inline: false },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    } catch (error) {
      console.error('Failed to send Discord webhook', error);
      // Fail silently to the user so they still get a success message
    }
  }

  return { success: true };
}