from ninja import NinjaAPI
from Users.api import router as users_router
from Residences.api import router as residences_router
from Listings.api import router as listings_router
from Swaps.api import router as swaps_router


api = NinjaAPI()

api.add_router("/users/", users_router)
api.add_router("/residences/", residences_router)
api.add_router("/listings/", listings_router)
api.add_router("/swaps/", swaps_router)







