Ext.Ajax.request({
    url: 'Person',
    method: 'GET',
    timeout: 60000,
    headers:
    {
        'Content-Type': 'application/json'
    },
    success: function (response) {
        console.log(Ext.decode(response.responseText))
    },
    failure: function (response) {
        Ext.Msg.alert('Status', 'Request Failed.');

    }
});