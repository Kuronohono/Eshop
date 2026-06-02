import React, { useState, useEffect, useRef } from 'react'

const Settings = ({ userData, onUserUpdated }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const [activeTab, setActiveTab] = useState("tab1")
  const [username, setUsername] = useState(userData?.username || "");
  const [userEmail, setUserEmail] = useState(userData?.email || "");
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const tabRefs = useRef({})

  useEffect(() => {
    setUsername(userData?.username || "")
    setUserEmail(userData?.email || "")
  }, [userData?.username, userData?.email])

  const handleSave = async () => {
    setError("")
    setSuccess("")

    const token = localStorage.getItem("token")
    if (!token) {
      setError("Please log in again.")
      return
    }

    const nextUsername = username.trim()
    const nextEmail = userEmail.trim()

    if (!nextUsername) {
      setError("Username cannot be empty")
      return
    }
    if (!nextEmail) {
      setError("Email cannot be empty")
      return
    }

    setSaving(true)
    const oldEmail = userData?.email

    try {
      const res = await fetch("http://localhost:8085/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: nextUsername, email: nextEmail }),
      })

      const text = await res.text()
      if (!res.ok) throw new Error(text || `Failed to save changes (${res.status})`)
      if (!text) throw new Error("Empty response from server")

      const updated = JSON.parse(text)
      onUserUpdated?.(updated)
      setSuccess("Saved.")

      // Token subject is email in your JWT. If email changes, old token will stop being valid.
      if (oldEmail && updated?.email && oldEmail !== updated.email) {
        localStorage.removeItem("token")
        localStorage.setItem("cartCount", "0")
        window.dispatchEvent(new Event("cartUpdated"))
        window.location.replace("/login")
      }
    } catch (e) {
      setError(e?.message || "Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='w-full gap-5 flex flex-col'>
      <h1 className='page_header'>Settings</h1>

        <div className="flex flex-col w-full lg:mx-0 mt-5 flex-1">
                    <div className="relative flex border-b border-black/10">

                     <div className='flex h-full w-full flex-col my-5 justify-center gap-10 lg:gap-20'>
          
                    <div className='flex flex-col gap-5'>

                    {/* Username */}
                  
                    <div className='flex flex-col'>
                      <h2 className='mx-2'>Username</h2>
                      
                      <div className="input_outerDiv w-full lg:w-[40%]">
                          <input
                              name="username"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter username"
                              required
                              className={`input_field pl-2 ${username.trim() === "" ? "border-red-500" : ""}`}
                          />
                      </div>
                      {username.trim() === "" && (
                              <span className="text-red-500 text-sm">Username cannot be empty</span>
                          )}  
                    </div>

                    {/* Email */}
                      <div className='flex flex-col'>
                      <h2 className='mx-2'>Email</h2>
                      
                      <div className="input_outerDiv w-full lg:w-[40%]">
                          <input
                              name="email"
                              type="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="Enter email"
                              required
                              className={`input_field pl-2 ${username.trim() === "" ? "border-red-500" : ""}`}
                          />
                      </div>
                                      {username.trim() === "" && (
                              <span className="text-red-500 text-sm">Email cannot be empty</span>
                          )}  
                    </div>

                    </div>

                    <button className='saveChangesBtn' onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    {error && <p className="font-satoshi text-sm text-red-500 mt-3">{error}</p>}
                    {success && <p className="font-satoshi text-sm text-green-600 mt-3">{success}</p>}

                  </div>
                </div>

    </div>
    </div>
  )
}

export default Settings