require "spec_helper"

feature "user deletes grocery item", js: true do
  scenario "successfully delete grocery item" do
    visit "/groceries"
    fill_in "Name", with: "bread"

    click_button "Add"
    click_button "Delete"
    expect(page).to_not have_content "bread"
  end
end
