When(/^I go to the homepage$/) do
  visit 'localhost:8080'
end

Then(/^I should see the welcome message$/) do
  expect(page).to have_content("Welcome to Crazy Kittens")
end