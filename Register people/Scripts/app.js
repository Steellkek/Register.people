Ext.Loader.setConfig({ enabled: true });

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'PersonApp',
    appFolder: '/Scripts/app',
    controllers: ['Persons'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'personpanel'
            }
        });
    }
});