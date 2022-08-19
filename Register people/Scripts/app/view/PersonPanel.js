Ext.define('PersonApp.view.PersonPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.personpanel',
    title: 'Реестр граждан',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'personsmallpanel',
        flex:1

    }, {  
        xtype: 'personlist',
        title: 'Список',
        flex: 5
    }]
});

