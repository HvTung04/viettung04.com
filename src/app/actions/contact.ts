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
  if (discordWebhookUrl) {
    try {
      await fetch(discordWebhookUrl, {
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
    } catch (error) {
      console.error('Failed to send Discord webhook', error);
      // Fail silently to the user so they still get a success message
    }
  }

  return { success: true };
}
