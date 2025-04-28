"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"

// Fake Data for Bookings (You can replace this with real data from an API or database)
const initialBookings = [
  { id: 1, name: "John Doe", date: "2025-04-25", time: "10:00 AM",  },
  { id: 2, name: "Jane Smith", date: "2025-04-26", time: "2:00 PM"},
  { id: 3, name: "Sara Lee", date: "2025-04-27", time: "9:00 AM",  },
]

export default function Page() {
  // State to manage the bookings
  const [bookings, setBookings] = useState(initialBookings)

  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // State to manage the new booking form input
  const [newBooking, setNewBooking] = useState({
    name: "",
    date: "",
    time: "",
    checkIn: "",
    checkOut: "",
    aadharNo: ""
  })

  // Handle input changes for the new booking
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewBooking((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission to add a new booking
  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (newBooking.name && newBooking.date && newBooking.time) {
      const newBookingEntry = {
        id: bookings.length + 1,
        name: newBooking.name,
        date: newBooking.date,
        time: newBooking.time,
      }
      setBookings((prev) => [...prev, newBookingEntry])
      setNewBooking({ name: "", date: "", time: "", checkIn: "",checkOut: "", aadharNo: "" }) // Clear the form
      setIsModalOpen(false) // Close the modal after adding
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <div className="p-4 w-full max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Booking
        </Button>
      </div>

      {/* Card displaying the bookings table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bookings List</CardTitle>
          <CardDescription>All current bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Table to display bookings */}
          <div className="w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for adding a new booking */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Booking</DialogTitle>
            <DialogDescription>Fill in the details to add a new booking</DialogDescription>
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
              <label htmlFor="time" className="block text-sm font-medium">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={newBooking.time}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Booking</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
