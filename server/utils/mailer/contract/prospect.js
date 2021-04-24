module.exports.sendProspectContract = (parameters) => {
  const {
    organization_name_slug,
    organization_name,
    organization_email,
    prospect_email,
    user_email,
    attachment_url,
  } = parameters;
  const mailOptions = {
    from: `${organization_name} <${organization_name_slug}@knockyoursalesoff.com>`,
    replyTo: organization_email,
    to: [prospect_email, user_email],
    subject: `${organization_name}: Contract Copy`,
    text: `Please find the signed copy of the contract attached.`,
    // cc: user_email,
    bcc: organization_email,
    attachments: [
      {
        filename: "contract.pdf",
        path: attachment_url,
      },
    ],
  };
  return mailOptions;
};
