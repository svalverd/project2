import sqlalchemy as db
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def index():
    engine = db.create_engine('sqlite:///COVID-Clinical-Trials.sqlite')
    #metadata = db.MetaData()
    connection = engine.connect()
    query = connection.execute("SELECT DISTINCT c.nctid, c.brieftitle, c.facility, c.contactname, c.contactphone, c.contactemail, c.enrollmentcount, c.locationstate, l.latitude, l.longitude FROM COVID_ClinicalTrials as c INNER JOIN lat_long as l on c.locationzip = l.locationzip")
    d, results = {}, []
    for rowproxy in query:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)] > thank you stackoverflow!
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        results.append(d)
    connection.close()
    return render_template("index.html", data=results)

if __name__ == "__main__":
    app.run(debug=True)
