const cron = require("node-cron");
const subscriptionModel = require("../models/subscription_model");

// Cron job that auto-advances renewal dates daily
function startRenewalCron() {
    cron.schedule("0 0 * * *", async () => {
        try {
            const subs = await subscriptionModel.getAllSubscriptions();
            const today = new Date();
    
            for (const sub of subs) {
                let renewal = new Date(sub.renewal_date);
    
                // Move renewal date forward until its in the future
                while (renewal < today) {
                    renewal.setMonth(renewal.getMonth() + 1);
                }
    
                const formatted = renewal.toISOString().split("T")[0];
    
                await subscriptionModel.updateSubscriptionDate(
                    sub.subscription_id,
                    formatted
                );
            }
        } catch (err) {
            console.error("Cron job failed:", err);
        }
    });
}

module.exports = { startRenewalCron };