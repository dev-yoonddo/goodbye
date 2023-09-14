package location;

public class LocationDTO {
	private String userID;
	private String doroName;
	private double latitude;
	private double longitude;
	
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getDoroName() {
		return doroName;
	}
	public void setDoroName(String doroName) {
		this.doroName = doroName;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	
	
}
