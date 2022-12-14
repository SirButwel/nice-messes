// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import AddressAutocompleteController from "./address_autocomplete_controller"
application.register("address-autocomplete", AddressAutocompleteController)

import FormController from "./form_controller"
application.register("form", FormController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import LoadingController from "./loading_controller"
application.register("loading", LoadingController)

import MapController from "./map_controller"
application.register("map", MapController)

import SketchController from "./sketch_controller"
application.register("sketch", SketchController)

import WordLengthController from "./word_length_controller"
application.register("word-length", WordLengthController)
