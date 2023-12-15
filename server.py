import flask_cors
from flask import Flask, request, jsonify
from flask import render_template
import json
from data_tools import *
import time

app = Flask(__name__, static_url_path="/static")
flask_cors.CORS(app)
databases = LoadData()
tag = ""


# DELETE THIS
def tagsTr():
    f = open("trending.json", "r")

    tags_list = json.load(f)
    f.close()
    # print(tags_list)
    return tags_list


@app.route("/")
def home():
    return render_template("index.html")


# modify both the function so they have the real functions as inputs / outputs
@app.route("/graphs/trending", methods=["GET", "POST"])
def trendingTagsGraph():
    tag_list = TopTagsByCount(databases)
    # print("trending tags")
    # # print(tag_list)
    # print(type(tag_list))
    # print(type(jsonify(tag_list)))
    # # print(tag_list)
    # # print(jsonify(tag_list).get_data(as_text=True))
    return jsonify(tag_list)


@app.route("/graphs/review", methods=["GET", "POST"])
def tagsByReview():
    tag_list = TopTagsByReviews(databases)
    print("tags by review")
    # print(tag_list)
    return jsonify(tag_list)


@app.route("/graphs/search", methods=["GET", "POST"])
def TrendingTag():
    global tag
    input = request.json
    # render_template("search.html")
    print("search")
    print(type(input))
    print(input)
    data = TagByDay(databases, input)
    print(data)
    # tag = data
    # print(tag)
    return data


@app.route("/neww", methods=["GET", "POST"])
def newThingh():
    time.delay(0.1)
    global tag
    print("new thing")
    print(tag)
    return tag


if __name__ == "__main__":
    app.run(debug=False)
