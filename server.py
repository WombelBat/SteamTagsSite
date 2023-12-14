import flask_cors
from flask import Flask, request, jsonify
from flask import render_template
import json

app = Flask(__name__, static_url_path="/static")
flask_cors.CORS(app)


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
    tag_list = tagsTr()
    print("trending tags")
    # print(tag_list)
    return tag_list


@app.route("/graphs/review", methods=["GET", "POST"])
def tagsByReview():
    tag_list = tagsTr()
    # print("tags by review")
    # print(tag_list)
    return tag_list


if __name__ == "__main__":
    app.run(debug=True)
