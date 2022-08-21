Ext.define('PersonApp.view.PersonList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.personlist',
    id:"membergrid",
    title: 'Реестр граждан',
    store: 'PersonStore',
    

    initComponent: function () {
        this.columns = [
            { header: 'Фамилия', dataIndex: 'LastName', flex: 1 },
            { header: 'Имя', dataIndex: 'FirstName', flex: 1},
            { header: 'Отчество', dataIndex: 'Patronymic', flex: 1 },
            { header: 'Дата рождения', dataIndex: 'Birthdate', flex: 1, xtype: 'datecolumn',format: 'd.m.Y', },
        ];

        this.callParent(arguments);
    }
});