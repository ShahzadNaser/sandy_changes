frappe.listview_settings['Company'] = {
	onload(list_view) {
		frappe.breadcrumbs.add('Accounts');
		const delete_company = () => {
			frappe.confirm(__("You want to delete the selected companies ?"), function () {
				const selected_docs = list_view.get_checked_items();
				const docnames = list_view.get_checked_items(true);
				if (selected_docs.length > 0) {
					frappe.call({
						method: "sandy_changes.controllers.events.delete",
						args: {"docnames": docnames},
						freeze: true,
						callback: function(r){
							if(!r.exc) {
								let doc = frappe.model.sync(r.message);
								frappe.set_route("List", "Company", "List");
							}
						}
					});
				}
			});
		};
		list_view.page.add_actions_menu_item(__('Delete Companies'), delete_company, true);
	}
};
