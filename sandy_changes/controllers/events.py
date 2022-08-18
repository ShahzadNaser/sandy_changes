import frappe
import json


@frappe.whitelist()
def delete(docnames = None):
    if not docnames:
        return 
    docnames = json.loads(docnames)
    frappe.enqueue(method="sandy_changes.controllers.events.delete_companies", timeout=6000, docnames=docnames)
    return True

@frappe.whitelist()
def delete_companies(docnames=[]):
    from erpnext.setup.doctype.company.company import create_transaction_deletion_request
    for company in docnames:
        if frappe.db.exists("Company",company):
            create_transaction_deletion_request(company)
            frappe.delete_doc("Company", company, force=1)
            frappe.db.commit()
    