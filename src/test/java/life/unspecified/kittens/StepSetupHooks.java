package life.unspecified.kittens;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;

public class StepSetupHooks {

//	private static final String SELENIUM_DRIVER_URL = "http://localhost:4444/wd/hub";
	private static final String SELENIUM_DRIVER_URL = "http://selenium-chrome:4444/wd/hub";

	private static RemoteWebDriver driver = null;

	@Before
	public void setupDriver() throws MalformedURLException {
		if (driver == null) {
				DesiredCapabilities capability = DesiredCapabilities.chrome();
				URL driverLocation = new URL(SELENIUM_DRIVER_URL);
				System.out.println("Setup Driver:\n");
				System.out.println("\t" + capability.toString());
				System.out.println("\tDriver Location " + driverLocation.toString());

			try {
				driver = new RemoteWebDriver(driverLocation, capability);
				driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
				driver.manage().timeouts().pageLoadTimeout(3, TimeUnit.SECONDS);
				driver.manage().window().setSize(new Dimension(1920, 1080));
			} catch (Exception ex) {
				throw new RuntimeException(ex);
			}
		}
	}

	@After
	public void teardown(Scenario scenario) {
		if (scenario != null && scenario.isFailed()) {
			try {
				scenario.write("Current Page URL is " + driver.getCurrentUrl());
				System.out.println("Current Page URL is " + driver.getCurrentUrl());
				System.out.println("Current Page title is\n" + driver.getTitle());
				System.out.println("Current Page text  is\n" + driver.findElement(By.tagName("body")).getText());
//				byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
//				scenario.embed(screenshot, "image/png");
			} catch (WebDriverException somePlatformsDontSupportScreenshots) {
				System.err.println(somePlatformsDontSupportScreenshots.getMessage());
			}
		}
		if (driver != null) {
			try {
				driver.quit();
			} finally {
				driver = null;
			}
		}
	}

	public static RemoteWebDriver getDriver() {
		if (StepSetupHooks.driver == null) {
			throw new RuntimeException("Driver is not defined");
		}
		return StepSetupHooks.driver;
	}

}