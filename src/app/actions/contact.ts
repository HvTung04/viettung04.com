'use server';

import prisma from '@/lib/db';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const budget = formData.get('budget') as string;
  const description = formData.get('description') as string;

  // Simulate network delay for UX
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Save to database
  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        budget: budget || null,
        description,
      },
    });
  } catch (error) {
    console.error('Failed to save contact submission to DB', error);
  }

  // If a Discord webhook is provided, dispatch a notification
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhookUrl) {
    console.warn(
      '[contact] DISCORD_WEBHOOK_URL is not set - notification skipped. ' +
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
              title: 'New Portfolio Contact Submission',
              color: 3965942, // Primary blue
              fields: [
                { name: 'Name', value: name || 'N/A', inline: true },
                { name: 'Email', value: email || 'N/A', inline: true },
                { name: 'Budget', value: budget || 'N/A', inline: true },
                { name: 'Message', value: description || 'N/A', inline: false },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (response.ok) {
        console.log('[contact] Discord notification sent (HTTP ' + response.status + ')');
      } else {
        const detail = await response.text().catch(() => '');
        console.error(
          `[contact] Discord notification FAILED: HTTP ${response.status} ${response.statusText} ${detail.slice(0, 300)}`
        );
      }
    } catch (error) {
      console.error('[contact] Failed to send Discord webhook', error);
      // Fail silently to the visitor so they still get a success message
    }
  }

  return { success: true };
}
