import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be at most 50 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be at least 0"],
    }, 
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ['sports', 'entertainment', 'education', 'health'],
        required: [true, "Category is required"],
    }, 
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, "Payment method is required"],
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: (value) => { value <= new Date() },
            message: "Start date must be in the past",
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate
            }, message: "Renewal date must be after start date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true,
    }
}, {
    timestamps: true,
});

// auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
    if(!this.renewalDate){
        const frequencyMap = {
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + frequencyMap[this.frequency]);
    }

    if(this.renewalDate < this.startDate){
        this.status = "expired";
    }

    next();
}
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;