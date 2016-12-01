require 'date'
require 'json'

readfile = open('madras music season 2016-17.txt')
writefile = open("passes/parsed - #{Time.now}.txt", 'w')
nos = %w{0 1 2 3 4 5 6 7 8 9}

location = ''
festival = ''
details = {
	:festival=>'',
	'location'=>'',
	'date'=>'',
	'time'=>'',
	'artists'=>[],
	'special' => '',
	'datetime' => '',
	'info' => ''
}
artist = {'name'=>'','instrument'=>''}


readfile.readlines.each do |line|
	line = line.strip
	show = false
	metadata = false
	details['special']=''
	details['artists']=[] 
	
	if line[-3..-1]=="day"
		details['date'] = line
		details['datetime'] = Date.parse(line)
		metadata = true
	elsif line[0..1]=="At"
		details['location'] = line[2..-1].strip
		metadata = true
	elsif line[0..3]=="Fest"
		details[:festival] = line.split("Festival:")[-1].strip
		metadata = true
	elsif line[0..3]=="Info"
		details['info'] = line.split("Info:")[-1].strip
		metadata = true
	elsif nos.include?(line[0])
		show = true
	end

	if show==true
		
		details['time'],artist_data = line.split(" - ").map(&:strip)

		if line.include?("*")
			type = 'concert-special'
		elsif line.include?("(")
			type = 'concert'
		else
			type = 'event'
		end

		case type
		when 'concert','concert-special'
			if type=='concert-special'
				artist_data, special_details = artist_data.split("*")
				details['special'] = special_details.gsub("*","")
			else
				details['special'] = ''
			end
			
			people = artist_data.split(',')
			people.each do |person|
				artist = {'name'=>'','instrument'=>''}
				name,instrument = person.split("(")
				artist['name'] = name.strip  
				artist['instrument'] = instrument.gsub(')','').gsub('(','')
				details['artists'] << artist

				artist = {'name'=>'','instrument'=>''}
			end

		when 'event'
			details['special'] = artist_data
		end

		data = details
	else 
		data = line
	end

	if metadata == true || data.length<3  
		next
	else
		data = "#{data.to_json},"
	end 

	writefile.puts(data)

end