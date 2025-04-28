"use client";
import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const [bookings, setBookings] = useState<
    {
      id: number;
      name: string;
      time: string;
      checkIn: string;
      checkOut: string;
      aadharNo: string;
      selectedRooms: string[];
      phoneNumber: string;
      address: string;
    }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newBooking, setNewBooking] = useState<{
    name: string;
    time: string;
    checkIn: string;
    checkOut: string;
    aadharNo: string;
    selectedRooms: string[];
    phoneNumber: string;
    address: string;
  }>({
    name: "",
    time: "",
    checkIn: "",
    checkOut: "",
    aadharNo: "",
    selectedRooms: [],
    phoneNumber: "",
    address: "",
  });

  const rooms = [
    { label: "Room 101", value: "Room 101" },
    { label: "Room 102", value: "Room 102" },
    { label: "Room 103", value: "Room 103" },
    { label: "Room 104", value: "Room 104" },
    { label: "Room 105", value: "Room 105" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newBooking.name &&
      newBooking.checkIn &&
      newBooking.aadharNo &&
      newBooking.selectedRooms.length &&
      newBooking.time &&
      newBooking.phoneNumber &&
      newBooking.address
    ) {
      const newBookingEntry = {
        id: bookings.length + 1,
        name: newBooking.name,
        time: newBooking.time,
        checkIn: newBooking.checkIn,
        checkOut: newBooking.checkOut,
        aadharNo: newBooking.aadharNo,
        selectedRooms: newBooking.selectedRooms,
        phoneNumber: newBooking.phoneNumber,
        address: newBooking.address,
      };
      setBookings((prev) => [...prev, newBookingEntry]);
      setNewBooking({
        name: "",
        time: "",
        checkIn: "",
        checkOut: "",
        aadharNo: "",
        selectedRooms: [],
        phoneNumber: "",
        address: "",
      });
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="p-4 w-full max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <SidebarTrigger />
          <h2 className="text-2xl font-bold">Bookings</h2>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Booking
        </Button>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bookings List</CardTitle>
          <CardDescription>All current bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.phoneNumber}</TableCell>
                    <TableCell>{booking.address}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Booking</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new booking
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBooking} className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newBooking.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium">
                Check In
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={newBooking.checkIn}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="check Out" className="block text-sm font-medium">
                Check Out
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={newBooking.checkOut}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={newBooking.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={newBooking.address}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium">
                Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={newBooking.time}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNo"
                name="aadharNo"
                value={newBooking.aadharNo}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium">
                Rooms
              </label>
              <MultiSelect
                options={rooms}
                onValueChange={(value) =>
                  setNewBooking((prev) => ({ ...prev, selectedRooms: value }))
                }
                placeholder="Select Rooms"
                variant="secondary"
                animation={2}
                maxCount={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Booking</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
