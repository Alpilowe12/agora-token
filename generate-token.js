// بيتنفذ تلقائياً جوه GitHub Actions - مش محتاج تشغّله بنفسك على جهازك أبداً
const { RtcTokenBuilder, Role } = require('agora-token/src/RtcTokenBuilder2');
const fs = require('fs');

const appId = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;
const channelName = 'mainlive';
const uid = 0; // 0 = توكن عام (Wildcard) يشتغل لأي مستخدم يستخدمه، مناسب لمنصة فيها أدمن وطلاب

if (!appId || !appCertificate) {
    console.error('لازم تضبط أسرار AGORA_APP_ID و AGORA_APP_CERTIFICATE في إعدادات المستودع (Repo Secrets)');
    process.exit(1);
}

// أقصى مدة صلاحية يسمح بيها أجورا للتوكن هي 24 ساعة بالظبط
const expireSeconds = 24 * 60 * 60;

const token = RtcTokenBuilder.buildTokenWithUid(
    appId, appCertificate, channelName, uid, Role.PUBLISHER, expireSeconds, expireSeconds
);

fs.writeFileSync('token.json', JSON.stringify({
    token,
    channelName,
    generatedAt: Date.now(),
    expiresAt: Date.now() + expireSeconds * 1000
}, null, 2));

console.log('تم توليد توكن جديد بنجاح لقناة:', channelName);
