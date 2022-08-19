Ext.define('PersonApp.view.PersonSmallPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personsmallpanel',

    items: [{

        xtype: 'personsearch'

    }, {
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'button',
            text: 'Добавить',
            action: 'addPerson'
        },{
            xtype: 'button',
            text: 'Изменить',
            action: 'editPerson'
        }, {
            xtype: 'button',
            text: 'Удалить',
            action: 'deletePerson',

        }, {
            xtype: 'button',
            text: 'Печать',
            action: 'printPersons',

        },
            {
                xtype: 'button',
                text: 'Выход',
                action: 'exitSearch',
            }]
    },]
});
