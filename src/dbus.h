#ifndef NODE_DBUS_H_
#define NODE_DBUS_H_

#include <v8.h>
#include <string>
#include <nan.h>

namespace NodeDBus {

	using namespace node;
	using namespace v8;
	using namespace std;

#define NATIVE_NODE_DEFINE_CONSTANT(target, name, constant)					\
	(target)->Set(v8::String::NewSymbol(name),							\
	v8::Integer::New(constant),											\
	static_cast<v8::PropertyAttribute>(v8::ReadOnly|v8::DontDelete))

	typedef enum {
		NODE_DBUS_BUS_SYSTEM,
		NODE_DBUS_BUS_SESSION
	} BusType;

	typedef struct {
		BusType type;
		DBusConnection *connection;
		uv_async_t *loop;
		Nan::Callback *methodCallback;
		Nan::Callback *signalCallback;
	} BusObject;

	typedef struct DBusAsyncData {
//		Nan::Persistent<Function> callback;
		Nan::Callback *callback;
		DBusPendingCall *pending;
		Nan::Callback *createError;
		BusObject *bus;

		~DBusAsyncData() {
			delete createError;
			delete callback;
		}
	} DBusAsyncData;

	typedef struct {
		BusObject *bus;
		std::string service;
		std::string object_path;
		std::string interface;
	} InterfaceObject;

	void EmitSignal(Local<Value> info);
}

#endif
