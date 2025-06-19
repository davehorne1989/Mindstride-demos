// Email notification function
async function sendEmailNotification(formData) {
    try {
        const templateParams = {
            to_email: 'patrick.horne@mindstride.ai',
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            company_name: formData.companyName,
            domain: formData.domain,
            employees: formData.employees,
            date: new Date().toLocaleString()
        };

        await emailjs.send(
            'service_u146lhh', // Replace with your EmailJS service ID
            'template_a2ibd3o', // Replace with your EmailJS template ID
            templateParams
        );
        
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Failed to send email notification:', error);
        // Don't disrupt the main flow if email fails
    }
} 