using Microsoft.Extensions.Options;
using SharedDeskConnect.Models;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SharedDeskConnect.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                using (var client = new SmtpClient(_smtpSettings.SmtpServer, _smtpSettings.Port))
                {
                    client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);
                    client.EnableSsl = true;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;

                    var message = new MailMessage(_smtpSettings.Username, to, subject, body)
                    {
                        IsBodyHtml = true // Set to true if your email body is HTML
                    };

                    await client.SendMailAsync(message);
                }
            }
            catch (SmtpException ex)
            {
                // Handle SMTP exceptions
                throw new ApplicationException($"SMTP error: {ex.Message} - {ex.StatusCode}");
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                throw new ApplicationException($"Failed to send email: {ex.Message}");
            }
        }
    }
}
