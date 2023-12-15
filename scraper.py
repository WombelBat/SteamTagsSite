import time
import json
from datetime import datetime
import requests
import os

_delay_ = 1.5
_delaypage_ = 61
_outputfolder_ = "database/"

def SendRequest(url, parameters=None):
    response = requests.get(url=url,params=parameters)
    return response

def SendRequestSteam(appID):
    url = "http://store.steampowered.com/api/appdetails/"
    response = SendRequest(url,{"appids":appID})
    if response:
        data = response.json()
        app = data[appID]
        if app["success"] == False:
            return None
        else:
            return app["data"]
    else:
        print("Bad response")
        return None

def SendRequestSteamSpy(appID):
    url=f"https://steamspy.com/api.php?request=appdetails&appid={appID}"
    response = SendRequest(url)

    if response:
        data = response.json()
        return data

def ParseGame(game):
    game['categories'] = []
    if 'categories' in game:
        for category in game['categories']:
            game['categories'].append(category['description'])

def GetSteamSpyGame(game):
    data = SendRequestSteamSpy(game['appID'])

    if data:
        game['positive'] = data['positive']
        game['negative'] = data['negative']
        game['tags'] =  data['tags']
    
    if 'tags' not in game or len(game['tags']) < 1:
        print("Game is empty!")
        game.clear()

def GetDataByGame(dataset, maxgames = -1):
    response = SendRequest('http://api.steampowered.com/ISteamApps/GetAppList/v2/')
    
    if response:
        time.sleep(_delay_)
        data = response.json()
        apps = data['applist']['apps']
        apps = [str(i['appid']) for i in apps]

    apps.reverse()
    total = len(apps)
    counter = 0
    for appID in apps:

        if maxgames != -1 and counter > maxgames:
            break
        
        counter = counter + 1
        print(f'{counter}/{total}')

        game = {}
        game['appID'] = appID
        #steam data
        # data = SendRequestSteam(game)
        
        #steam spy data
        GetSteamSpyGame(game=game)

        if game:
            dataset.append(game)
        time.sleep(_delay_)

def Scraper(maxgames = -1):
    dataset = []

    GetDataByGame(dataset=dataset,maxgames=maxgames)
    
    cTime = datetime.now()
    path = _outputfolder_ + cTime.strftime('%Y-%m-%d')
    outFile = open(path,'w+')
    
    dataset[0]["date"] = cTime.strftime('%Y-%m-%d')
    json.dump(dataset,fp=outFile)
    
    print(os.path.abspath(path))
    return os.path.abspath(path)
