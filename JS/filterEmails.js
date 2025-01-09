document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("emailInput").value;

    const emails = emailInput
        .split("\n")
        .map(email => email.trim())
        .filter(email => email !== ""); // Remove empty lines

    const restrictedPatterns = [
        "_", "-", "Email@", "support@", "service@", "Customer@",
        "India", "Pakistan", "Singh", "www", "+"
    ];

    const validEmails = [];
    const invalidEmails = [];

    emails.forEach(email => {
        const localPart = getLocalPartFromEmail(email);

        // Validate against RFC 5321/5322 and custom rules
        if (!isValidRFCEmail(email) || localPart.length < 6 || containsRestrictedPatterns(email, restrictedPatterns)) {
            invalidEmails.push(email); // Add to invalidEmails if any condition fails
        } else {
            validEmails.push(email); // Add to validEmails otherwise
        }
    });

    // Display valid and invalid emails in their respective containers
    document.getElementById("validEmails").value = validEmails.join("\n");
    document.getElementById("invalidEmails").value = invalidEmails.join("\n");
    updateValidCount();
});

function updateMailCount() {
    const emailTextarea = document.getElementById("emailInput");
    const mailCntSpan = document.getElementById("mailCnt");

    const validEmails = emailTextarea.value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== '');
    mailCntSpan.textContent = validEmails.length;

//    if (validEmails.length > 3000) {
//        mailCntSpan.style.fontSize = "150%";
//    } else {
//        mailCntSpan.style.fontSize = "100%";
//    }
}

function updateValidCount() {
    const validEmailTextarea = document.getElementById("validEmails");
    const ValidCntSpan = document.getElementById("validCnt");

    const validEmails = validEmailTextarea.value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== '');

    ValidCntSpan.textContent = validEmails.length;

//    if (validEmails.length > 3000) {
//        mailCntSpan.style.fontSize = "150%";
//    } else {
//        mailCntSpan.style.fontSize = "100%";
//    }
}

document.getElementById("copyValidEmails").addEventListener("click", function () {
    const validEmails = document.getElementById("validEmails").value;
    navigator.clipboard.writeText(validEmails).then(() => {
        alert("Valid emails copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy valid emails:", err);
    });
});

function containsRestrictedPatterns(email, patterns) {
    return patterns.some(pattern => email.toLowerCase().includes(pattern.toLowerCase()));
}

function getLocalPartFromEmail(email) {
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.substring(0, atIndex) : "";
}

// RFC 5321/5322 email validation function
function isValidRFCEmail(email) {
    const rfcEmailRegex = /^(?!.*\.\.)(?!\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return rfcEmailRegex.test(email);
}