const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

module.exports = {
    M: modelName => mongoose.model(modelName),
    initMongo: () => {
        mongoose.connect('mongodb://admin:pwd@xx.xxx.xx.xxx:xxxxx/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        console.log("%c 💋: db ", "font-size:16px;background-color:#25f591;color:black;", db.collections)
        // 将连接与错误事件绑定（以获得连接错误的提示）
        db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

        const MappSchema = new Schema({
            id: String,
            appId: String,
            appKey: String,
            title: String,
            intro: String,
            subapp: [{
                name: String,
                assets: [String],
                version: String,
            }],
            entry: String,
            proxy: Object,
            template: String,
            omega: String,
            authSystem: String,
            collaborators: [String],
            creator: String,
            curStatus: {
                status: String,
                id: String,
                date: Date,
            },
            statusList: [
                {
                    status: String,
                    id: String,
                    date: Date,

                }
            ],
            createDate: Date,
            appEnv: String,
            callbackIndex: String,
            domain: String,
            icon: String,
            layout: String,
            raven: String,
            style: String,
        }, {
            collection: 'mapp',
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        });

        model('Mapp', MappSchema);
    }
}