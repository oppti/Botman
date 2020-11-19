import sys
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, ElementClickInterceptedException
from selenium.webdriver.firefox.options import Options

seleniumException = (NoSuchElementException, ElementNotInteractableException, ElementClickInterceptedException)

username = "ti@oppti.com.br"
password = "0PP0rtunity"
url = 'https://ccrc.cisco.com/ccwr/'

# default error message
errorMsg = 'O sistema falhou ao executar, por favor tente novamente.'

# default timers
timeout = 10
waitTime = 0.5

def browserInput(browser, userInput, timeout=timeout, waitTime=waitTime):
    totalTime = 0

    while totalTime < timeout:
        
        try:
            return browser.send_keys(userInput)
        
        except seleniumException:
            totalTime += waitTime
            time.sleep(waitTime)

    print(errorMsg)
    browser.quit()
    sys.exit(1)


def browserInputClear(browser, timeout=timeout, waitTime=waitTime):
    totalTime = 0

    while totalTime < timeout:
        
        try:
            return browser.clear()
        
        except seleniumException:
            totalTime += waitTime
            time.sleep(waitTime)

    print(errorMsg)
    browser.quit()
    sys.exit(1)


def browserSearch(browser, timeout=timeout, waitTime=waitTime):

    while True:
        try:
            browser.find_element_by_class_name('LoadingBar-SpinnerContainer')
            time.sleep(waitTime)
        except NoSuchElementException:
            break

    searchButton = findObject(browser, "SearchInput-SearchButton", 'class', timeout, waitTime)
    browserClick(searchButton, timeout, waitTime)


def browserClick(browser, timeout=timeout, waitTime=waitTime):
    totalTime = 0

    while totalTime < timeout:

        try:
            return browser.click()

        except seleniumException:
            totalTime += waitTime
            time.sleep(waitTime)

    print(errorMsg)
    browser.quit()
    sys.exit(1)


def findObject(browser, objectName, type, timeout=timeout, waitTime=waitTime):
    totalTime = 0

    while totalTime < timeout:

        try:
            if type == 'id':
                return browser.find_element_by_id(objectName)
            
            elif type == 'class':
                return browser.find_element_by_class_name(objectName)
            
            else:
                raise

        except seleniumException:
            totalTime += waitTime
            time.sleep(waitTime)

    print(errorMsg)
    browser.quit()
    sys.exit(1)


def findSerial(browser, timeout=timeout, waitTime=waitTime):
    totalTime = 0

    while totalTime < timeout:
        
        try:
            return browser.find_element_by_class_name('DetailedViewTable-TableContainer')
        
        except seleniumException:
            
            try:
                browser.find_element_by_class_name('BannerMessage-Content')
                return False
            
            except seleniumException:
                totalTime += waitTime
                time.sleep(waitTime)

    print(errorMsg)
    browser.quit()
    sys.exit(1)


def ccw(serialList):
    options = Options()
    options.headless = True
    
    browser = webdriver.Firefox(options=options)
    browser.get(url)

    # Username input
    userID = findObject(browser, 'userInput', 'id')
    browserInput(userID, username)
    browserClick(userID)
    nextButton = findObject(browser, 'login-button', 'id')
    browserClick(nextButton)

    # Password input
    userPassword = findObject(browser, 'password', 'id')
    browserInput(userPassword, password)
    browserClick(userPassword)
    loginButton = findObject(browser, 'kc-login', 'id')
    browserClick(loginButton)

    # Close Cisco banner
    elementPopup = findObject(browser, "c7b0927d-a80d-e71e-fde3-cf417d0f7731", 'id', 25)
    browserClick(elementPopup)

    # Search for the serial numbers
    serialHTML = {}
    for serial in serialList:
        elementSearch = findObject(browser, "SearchInput-Input", 'class')
        
        # Clears search input field
        browserInputClear(elementSearch)
        browserSearch(browser)

        browserInput(elementSearch, serial)  # chama o serial

        browserSearch(browser)

        element = findSerial(browser)

        if element == False:
            serialHTML[serial] = '\n\nSerial number **{}** não encontrado. Verifique se o número é válido.'.format(serial)
        else:
            serialHTML[serial] = element.get_attribute('outerHTML')

    browser.quit()

    message = 'Essas são as informações que encontrei:'

    for serial in serialHTML:

        if serialHTML[serial].startswith('\n\nSerial'):
            message += serialHTML[serial]

        else:
            soup = BeautifulSoup(serialHTML[serial], 'html.parser')

            # criar dicionario
            serialData = {}

            serialData['Product name'] = soup.find('span', 'ProductCell-Name').find(text=True)
            contrato = soup.find_all('button', 'ContractNumberCell-Link')
            Data_fim = soup.find_all('span', 'StartDateEndDateCell-End')
            customer = soup.find_all('span', 'LimitedListParty-Name')
            location = soup.find_all('span', 'LimitedListParty-Address')

            if contrato:
                serialData['Contract number'] = contrato[-1].find_all(text=True)[-1]
            else:
                serialData['Contract number'] = '--'
    
            if Data_fim:
                serialData['End date'] = Data_fim[-1].find_all(text=True)[-1]
            else:
                serialData['End date'] = '--'
    
            if customer and location:
                serialData['Customer name'] = customer[0].find_all(text=True)[0]
            else:
                serialData['Customer name'] = '--'
    
            message += '\n\nSerial number: **{}**\nPart number: **{}**\nContract number: **{}**\nEnd date: **{}**\nCustomer: **{}**'.format(
                serial, serialData['Product name'], serialData['Contract number'], serialData['End date'],
                serialData['Customer name'])
    
    print(message)


if __name__ == "__main__":
    serialList = sys.argv[1].split(',')
    ccw(serialList)
