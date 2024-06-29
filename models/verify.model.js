
module.exports = (connection, sequelize) => {
	const Verify = connection.define('verify', {
		verifyId: {
			type: sequelize.INTEGER,
			autoIncrement:true,
			primaryKey: true
		},
		verifyUserId: {
			type: sequelize.UUID,
		},
		verifyCode: {
			type: sequelize.STRING(20),
		},
		verifyType: {
			type: sequelize.STRING(50),
		},
		verifyEffectOn: { 
			type: sequelize.STRING(50) 
		}
	},
		{
			indexes: [
				{
					using: 'BTREE',
					fields: ['verifyId']
				},
				{
					using: 'BTREE',
					fields: ['verifyUserId']
				}
			]
		}
	)
	return Verify
}