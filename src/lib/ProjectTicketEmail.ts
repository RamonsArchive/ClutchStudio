import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      throw new Error('Company email not configured');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Ticket - ${firstName} ${lastName}</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0;
            margin-bottom: 0;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 600;
          }
          .content { 
            background: white; 
            padding: 30px; 
            border-radius: 0 0 10px 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .ticket-info { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #667eea;
          }
          .contact-details { 
            background: #e3f2fd; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #2196f3;
          }
          .message-box { 
            background: #fff3e0; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #ff9800;
          }
          .label { 
            font-weight: 600; 
            color: #555; 
            display: inline-block; 
            width: 120px; 
            margin-right: 10px;
          }
          .value { 
            color: #333; 
            font-weight: 500;
          }
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #eee; 
            color: #666; 
            font-size: 14px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 New Project Ticket</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">A new client inquiry has been submitted</p>
        </div>
        
        <div class="content">
          <h2 style="color: #333; margin-top: 0;">Client Information</h2>
          
          <div class="contact-details">
            <div style="margin-bottom: 15px;">
              <span class="label">Name:</span>
              <span class="value">${firstName} ${lastName}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span class="label">Email:</span>
              <span class="value">${email}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span class="label">Phone:</span>
              <span class="value">${phoneNumber}</span>
            </div>
            ${organization ? `
            <div style="margin-bottom: 15px;">
              <span class="label">Organization:</span>
              <span class="value">${organization}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="ticket-info">
            <div style="margin-bottom: 15px;">
              <span class="label">Service:</span>
              <span class="value">${service}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span class="label">Ticket ID:</span>
              <span class="value">#${ticketId}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span class="label">Project ID:</span>
              <span class="value">#${projectId}</span>
            </div>
          </div>
          
          <div class="message-box">
            <div style="margin-bottom: 15px;">
              <span class="label">Message:</span>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #ddd;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="mailto:${email}?subject=Re: Project Inquiry - ${firstName} ${lastName}" class="cta-button">
              📧 Reply to Client
            </a>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 20px; font-size: 14px; color: #666;">
            <strong>Quick Actions:</strong><br>
            • Reply directly to this email to respond to the client<br>
            • Add client to your CRM system<br>
            • Schedule a discovery call<br>
            • Send project proposal
          </div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated by your Clutch Studio website</p>
          <p>Generated on ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Clutch Studio <onboarding@resend.dev>',
      to: [companyEmail || 'clutchdev.apps@gmail.com'], // Fallback to your email for testing
      subject: `🎯 New Project Ticket: ${firstName} ${lastName} - ${service}`,
      html: htmlContent,
      replyTo: email, // So you can reply directly to the client
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    console.log('Project ticket email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };

  } catch (error) {
    console.error('Error sending project ticket email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};