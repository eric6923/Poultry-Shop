from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/order', methods=['POST'])
def process_order():
    data = request.get_json()
    legs_ordered = int(data.get('legs', 0))
    wings_ordered = int(data.get('wings', 0))
    flesh_ordered = int(data.get('flesh', 0))
    
    LEG_WEIGHT = 0.25  
    WING_WEIGHT = 0.25  
    FLESH_WEIGHT = 1.0  
    CHICKEN_WEIGHT = 2.0  

    total_order_weight = (legs_ordered * LEG_WEIGHT + 
                          wings_ordered * WING_WEIGHT + 
                          flesh_ordered * FLESH_WEIGHT)

    chickens_needed = max(legs_ordered / 2, wings_ordered / 2, flesh_ordered)

    total_legs = chickens_needed * 2
    total_wings = chickens_needed * 2
    total_flesh = chickens_needed

    remaining_legs = total_legs - legs_ordered
    remaining_wings = total_wings - wings_ordered
    remaining_flesh = total_flesh - flesh_ordered

    remaining_legs_weight = remaining_legs * LEG_WEIGHT
    remaining_wings_weight = remaining_wings * WING_WEIGHT
    remaining_flesh_weight = remaining_flesh * FLESH_WEIGHT

    remaining_total_weight = (remaining_legs_weight + 
                              remaining_wings_weight + 
                              remaining_flesh_weight)

    result = {
        'totalWeight': total_order_weight,
        'wholeChickens': int(chickens_needed),
        'remaining': {
            'legs': remaining_legs,
            'wings': remaining_wings,
            'flesh': remaining_flesh,
            'legsWeight': remaining_legs_weight,
            'wingsWeight': remaining_wings_weight,
            'fleshWeight': remaining_flesh_weight,
            'totalWeight': remaining_total_weight
        }
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
