
module.exports = (connection, sequelize) => {
	const Verify = connection.define('verify', {
		id: {
			type: sequelize.UUID,
			defaultValue: sequelize.UUIDV4,
			primaryKey: true
		},
		userId: {
			type: sequelize.UUID,
		},
		verifyCode: {
			type: sequelize.STRING,
		},
		verifyType: {
			type: sequelize.STRING,
		}
		, effectOn: { 
			type: sequelize.UUID 
		}
	},
		{
			indexes: [
				{
					using: 'BTREE',
					fields: ['id']
				},
				{
					using: 'BTREE',
					fields: ['userId']
				}
			]
		}
	)
	return Verify
}