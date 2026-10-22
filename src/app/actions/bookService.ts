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
  if (!discordWebhookUrl) {
    console.warn(
      '[booking] DISCORD_WEBHOOK_URL is not set - notification skipped. ' +
        'Add it to .env and make sure the container receives it (env_file).'
    );
  } else {
    try {
      const response = await fetch(discordWebhookUrl, {
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

      if (response.ok) {
        console.log('[booking] Discord notification sent (HTTP ' + response.status + ')');
      } else {
        const detail = await response.text().catch(() => '');
        console.error(
          `[booking] Discord notification FAILED: HTTP ${response.status} ${response.statusText} ${detail.slice(0, 300)}`
        );
      }
    } catch (error) {
      console.error('[booking] Failed to send Discord webhook', error);
      // Fail silently to the visitor so they still get a success message
    }
  }

  return { success: true };
}