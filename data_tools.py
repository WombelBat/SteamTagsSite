import scraper
import os
import json
import operator
from datetime import datetime


def LoadData():
    datasets = []

    dirs = sorted(os.listdir(scraper._outputfolder_))
    for path in dirs:
        path = scraper._outputfolder_ + path
        file = open(path, "r")

        dataset = json.load(file)
        datasets.append(dataset)
    return datasets


def FindTag(target, tags):
    for i, cTag in enumerate(tags):
        if target == cTag["tag"]:
            return i
    return -1


def TopTagsByCount(datasets):
    # get last dataset
    dataset = datasets[-1]

    tags = []

    for game in dataset:
        for tag in game["tags"]:
            index = FindTag(tag, tags)
            if index == -1:
                new_tag = {"tag": tag, "number": 1}
                tags.append(new_tag)
            else:
                tags[index]["number"] = tags[index]["number"] + 1
    tags = sorted(tags, key=operator.itemgetter("number"), reverse=True)
    return tags[:10]


def TopTagsByReviews(datasets):
    # get last dataset
    dataset = datasets[-1]

    tags = []

    for game in dataset:
        ratio = game["positive"] / (game["negative"] + game["positive"])
        for tag in game["tags"]:
            index = FindTag(tag, tags)
            if index == -1:
                new_tag = {"tag": tag, "number": ratio, "count": 1}
                tags.append(new_tag)
            else:
                tags[index]["number"] = (
                    (tags[index]["count"] * tags[index]["number"]) + ratio
                ) / (tags[index]["count"] + 1)
                tags[index]["count"] = tags[index]["count"] + 1

    tags = sorted(tags, key=operator.itemgetter("number"), reverse=True)
    return tags[:10]


def GetDateFromDataset(dataset):
    for game in dataset:
        if "date" in game:
            return game["date"]


def TagByDay(datasets, tag):
    points = []
    for dataset in datasets:
        point = {}
        date = GetDateFromDataset(dataset)
        point["date"] = date

        counter = 0
        for game in dataset:
            if tag in game["tags"]:
                counter = counter + 1
        point["quantity"] = counter
        points.append(point)
    return points


datasets = LoadData()
