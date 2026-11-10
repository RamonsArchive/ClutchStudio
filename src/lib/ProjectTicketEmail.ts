import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Form values are typed by visitors, so escape them before they go into HTML
const escapeHtml = (value: string) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendProjectTicketEmail = async (
  projectId: string,
  ticketId: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  service: string,
  organization: string,
  message: string
) => {
  try {
    const companyEmail = process.env.COMPANY_EMAIL;

    if (!companyEmail) {
      throw new Error("Company email not configured");
    }

    // Escaped copies used only inside the HTML below
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhoneNumber = escapeHtml(phoneNumber);
    const safeService = escapeHtml(service);
    const safeOrganization = escapeHtml(organization);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const replyHref = escapeHtml(
      `mailto:${email}?subject=${encodeURIComponent(
        `Re: Project Inquiry - ${firstName} ${lastName}`
      )}`
    );

    // rvector palette: navy #162640 / cyan #23C4E1 / orange #FB5E01
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Ticket - ${safeFirstName} ${safeLastName}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #162640;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f1f5fb;
          }
          .header {
            background: #162640;
            color: #ffffff;
            padding: 30px;
            text-align: left;
            border-radius: 12px 12px 0 0;
            border-bottom: 4px solid #23C4E1;
            margin-bottom: 0;
          }
          .brand {
            margin: 0 0 12px 0;
            font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
            font-size: 12px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #23C4E1;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            color: #ffffff;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #dfe8f4;
            border-top: none;
            border-radius: 0 0 12px 12px;
          }
          .section-title {
            margin: 0 0 4px 0;
            font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #3c5c8c;
          }
          .ticket-info {
            background: #f1f5fb;
            padding: 20px;
            border-radius: 8px;
            margin: 12px 0 24px 0;
            border-left: 4px solid #162640;
          }
          .contact-details {
            background: #ecfbfe;
            padding: 20px;
            border-radius: 8px;
            margin: 12px 0 24px 0;
            border-left: 4px solid #23C4E1;
          }
          .message-box {
            background: #fff5ec;
            padding: 20px;
            border-radius: 8px;
            margin: 12px 0 24px 0;
            border-left: 4px solid #FB5E01;
          }
          .row {
            margin-bottom: 12px;
          }
          .label {
            font-weight: 600;
            color: #3c5c8c;
            display: inline-block;
            width: 120px;
            margin-right: 10px;
          }
          .value {
            color: #162640;
            font-weight: 500;
            word-break: break-word;
          }
          .footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 16px;
            color: #5f7fae;
            font-size: 13px;
          }
          .cta-button {
            display: inline-block;
            background: #FB5E01;
            color: #ffffff !important;
            padding: 12px 28px;
            text-decoration: none;
            border-radius: 999px;
            font-weight: 600;
            margin: 8px 0 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="brand">rvector.dev</p>
          <h1>New Project Ticket</h1>
          <p style="margin: 10px 0 0 0; color: #bfd0e6;">A new inquiry was submitted through the contact form</p>
        </div>

        <div class="content">
          <p class="section-title">Contact</p>
          <div class="contact-details">
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${safeFirstName} ${safeLastName}</span>
            </div>
            <div class="row">
              <span class="label">Email:</span>
              <span class="value">${safeEmail}</span>
            </div>
            <div class="row">
              <span class="label">Phone:</span>
              <span class="value">${safePhoneNumber}</span>
            </div>
            ${
              organization
                ? `
            <div class="row">
              <span class="label">Organization:</span>
              <span class="value">${safeOrganization}</span>
            </div>
            `
                : ""
            }
          </div>

          <p class="section-title">Ticket</p>
          <div class="ticket-info">
            <div class="row">
              <span class="label">Service:</span>
              <span class="value">${safeService}</span>
            </div>
            <div class="row">
              <span class="label">Ticket ID:</span>
              <span class="value">#${escapeHtml(ticketId)}</span>
            </div>
            <div class="row">
              <span class="label">Project ID:</span>
              <span class="value">#${escapeHtml(projectId)}</span>
            </div>
          </div>

          <p class="section-title">Message</p>
          <div class="message-box">
            <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #ffe8d3; color: #162640; word-break: break-word;">
              ${safeMessage}
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${replyHref}" class="cta-button">
              Reply to ${safeFirstName}
            </a>
          </div>

          <div style="background: #f1f5fb; padding: 15px; border-radius: 6px; font-size: 14px; color: #3c5c8c;">
            <strong>Tip:</strong> replying directly to this email also goes to the sender.
          </div>
        </div>

        <div class="footer">
          <p>This email was automatically generated by the rvector.dev contact form</p>
          <p>Generated on ${new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: "rvector.dev <onboarding@resend.dev>",
      to: [companyEmail],
      subject: `New Project Ticket: ${firstName} ${lastName} - ${service}`,
      html: htmlContent,
      replyTo: email, // So you can reply directly to the sender
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    console.log("Project ticket email sent successfully:", result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error("Error sending project ticket email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
